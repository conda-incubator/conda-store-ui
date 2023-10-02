"""Test suite for user interactions with the UI. It is designed to run both
inside and outside of pytest to make future development easier. 
"""
import os
import requests
import time

import pytest
from playwright.sync_api import Page
from playwright.sync_api import sync_playwright
import random


CONDA_STORE_SERVER_PORT = os.environ.get(
    "CONDA_STORE_SERVER_PORT", f"8080"
)
CONDA_STORE_BASE_URL = os.environ.get(
    "CONDA_STORE_BASE_URL", f"http://localhost:{CONDA_STORE_SERVER_PORT}"
)
CONDA_STORE_USERNAME = os.environ.get("CONDA_STORE_USERNAME", "username")
CONDA_STORE_PASSWORD = os.environ.get("CONDA_STORE_PASSWORD", "password")


@pytest.fixture
def test_config():
    return {
        'base_url': CONDA_STORE_BASE_URL,
        'username': CONDA_STORE_USERNAME,
        'password': CONDA_STORE_PASSWORD,
        'server_port': CONDA_STORE_SERVER_PORT,
    }


def login_sequence(page, screenshot=False):
    """Conda-store ui login sequence. From the default UI interface, click log
    in and go through the log in UI on the following page. The UI will be 
    returned back to the default UI. 
    """
    # Log in sequence
    # Click Login
    page.locator("text=Log in").click()

    if screenshot:
        page.screenshot(path="test-results/conda-store-login_screen.png")

    # Fill in the Username field
    page.locator('[placeholder="Username"]').fill("username")

    # Fill in the Password field
    page.locator('[placeholder="Password"]').fill("password")

    with page.expect_navigation():
        page.locator('button:has-text("Sign In")').click()

    if screenshot:
        page.screenshot(path="test-results/conda-store-authenticated.png")


def create_new_environment(page, screenshot=False):
    """Workflow to create a new environment in the UI. The env will be 
    in the "username" workspace and will have a semi-random number to
    ensure that the env is indeed new since if the environment already
    exists we get a different UI. This allows this test to be run multiple
    times without needing to empty the database. 

    Note: this environment takes about a minute to create
    WARNING: Changes to this method will require reflective changes on 
    `existing_environment_interactions` since it uses this env. 
    
    Parameters
    ----------
    page: playwright.Page
        page object for the current test being run
    screenshot: bool
        [Optional] Flag to trigger screenshot collection, set to True to  
        grab screenshots
    """
    # ensure new filename in case this test is run multiple times
    new_env_name = f'test_env_{random.randint(0, 100000)}' 
    # set timeout for building the environment
    time_to_build_env = 2 * 60 * 1000  # 2 minutes in milliseconds

    # Create the new environment
    # click the + to create a new env
    page.get_by_label("Create a new environment in the username namespace").click()
    if screenshot:
        page.screenshot(path="test-results/conda-store-new-env.png")
    # fill in the env name
    page.get_by_placeholder("Environment name").fill(new_env_name)
    # fill in the description
    page.get_by_placeholder("Enter here the description of your environment").fill("description")
    # click the + to add a package
    page.get_by_role("button", name="+ Add Package").click()
    # add a package to the ui
    page.get_by_label("Enter package").fill("rich")
    page.get_by_role("option", name="rich", exact=True).click()
    # open up the channels accordian card
    page.get_by_role("button", name="Channels").click()
    # click the + to add a channel
    page.get_by_role("button", name="+ Add Channel").click()
    # fill in conda-forge as the new channel name
    page.get_by_label("Enter channel").fill("conda-forge")
    # press enter to submit the channel to the list
    page.get_by_label("Enter channel").press("Enter")
    # click create to start building the env
    page.get_by_role("button", name="Create", exact=True).click()
    
    # Interact with the environment shortly after creation
    # click to open the Active environment dropdown manu
    page.get_by_role("button", name=" - Active", exact=False).click()
    # click on the Active environment on the dropdown menu item (which is currently building)
    page.get_by_role("option", name=" - Active", exact=False).click()
    # ensure that the environment is building
    assert page.get_by_text("Building").is_visible()
    # wait until the status is `Completed`
    completed = page.get_by_text("Completed", exact=False)
    completed.wait_for(state='attached', timeout=time_to_build_env)
    assert completed.is_visible()

    return new_env_name


def close_environment_tabs(page):
    """Close any open tabs in the UI. This will continue closing tabs 
    until no tabs remain open.

    Paramaters
    ----------
    page: playwright.Page
        page object for the current test being run
    """
    close_tab = page.get_by_test_id("closeTab")
    while close_tab.count() > 0:
        close_tab.first.click()


def existing_environment_interactions(page, env_name, time_to_build_env=2*60*1000, screenshot=False):
    """test interactions with existing environments. 
    During this test, the test will be rebuilt twice. 

    Note: This test assumes the environment being tested is the one from 
    `create_new_environment`. Changes to that method will require changes
    here as well (expected existing packages, etc). 

    Parameters
    ----------
    page: playwright.Page
        page object for the current test being run
    screenshot: bool
        [Optional] Flag to trigger screenshot collection, set to True to  
        grab screenshots

    """
    # edit existing environment throught the YAML editor
    page.get_by_role("button", name=env_name).click()
    page.get_by_role("button", name="Edit").click()
    page.get_by_label("Switch to YAML Editor").check()
    if screenshot:
        page.screenshot(path="test-results/conda-store-yaml-editor.png")
    page.get_by_text("- rich").click()
    # TODO: is "-pip: nothing" a bug?
    page.get_by_text("channels: - conda-forgedependencies: - rich - pip: - nothing - ipykernel").fill("channels:\n  - conda-forge\ndependencies:\n  - rich\n  - python\n  - pip:\n      - nothing\n  - ipykernel\n\n")
    page.get_by_role("button", name="Save").click()
    # wait until the status is `Completed`
    completed = page.get_by_text("Completed", exact=False)
    completed.wait_for(state='attached', timeout=time_to_build_env)

    # ensure the namespace is expanded
    if not page.get_by_role("button", name=env_name).is_visible():
        # click to expand the `username` name space (but not click the +)
        page.get_by_role("button", name="username Create a new environment in the username namespace").click()

    # edit existing environment
    page.get_by_role("button", name=env_name).click()
    page.get_by_role("button", name="Edit").click()
    # page.get_by_placeholder("Enter here the description of your environment").click()
    # change the description
    page.get_by_placeholder("Enter here the description of your environment").fill("new description")
    # change the vesion spec of an existing package
    page.get_by_role("row", name="ipykernel", exact=False).get_by_role("button").first.click()
    page.get_by_role("option", name=">=").click()
    # Note: purposefully not testing version constraint since there is inconsistent behavior here

    # add a new package
    page.get_by_role("button", name="+ Add Package").click()
    page.get_by_label("Enter package").fill("click")
    page.get_by_role("option", name="click", exact=True).click()
    # Note: purposefully not testing version constraint since there is inconsistent behavior here
    
    # delete a package
    page.get_by_role("row", name="rich", exact=False).get_by_test_id("RemovePackageTest").click()

    # promote a package installed as dependency to specified package
    page.locator("#infScroll > .infinite-scroll-component__outerdiv > .infinite-scroll-component > div > div > .MuiButtonBase-root").first.click()
    
    # delete conda-forge channel
    page.get_by_test_id("DeleteIcon").click()
    # add conda-forge channel
    page.get_by_role("button", name="+ Add Channel").click()
    page.get_by_label("Enter channel").fill("conda-forge")
    page.get_by_label("Enter channel").press("Enter")
    # click save to start the new env build
    page.get_by_role("button", name="Save").click()

    # wait until the status is `Completed`
    completed = page.get_by_text("Completed", exact=False)
    completed.wait_for(state='attached', timeout=time_to_build_env)


    # Edit -> Cancel editing
    page.get_by_role("button", name=env_name).click()
    page.get_by_role("button", name="Edit").click()
    page.get_by_role("button", name="Cancel").click()

    # Edit -> Delete environment
    page.get_by_role("button", name="Edit").click()
    page.get_by_text("Delete environment").click()
    page.get_by_role("button", name="Delete").click()

    assert not page.get_by_role("button", name=env_name).is_visible()



def test_integration(page: Page, test_config, screenshot):
    """Basic integration test.

    When this test runs in CI, we launch the webpack server as a detached 
    service at the same time that this test is run. For this reason, we 
    have a try/except here to allow the webpack server to finish deploying
    before the test begins. 
    """
    # wait for server to spin up if necessary
    server_running = False
    while not server_running:
        try: 
            requests.head(test_config['base_url'], allow_redirects=True).status_code != 200
            server_running = True
        except requests.exceptions.ConnectionError:
            time.sleep(2)

    # Go to http://localhost:{server_port}
    page.goto(test_config['base_url'], wait_until="domcontentloaded", timeout=4*60*1000)

    page.screenshot(path="test-results/conda-store-unauthenticated.png")
    if screenshot:
        page.screenshot(path="test-results/conda-store-unauthenticated.png")

    login_sequence(page, screenshot=screenshot)


if __name__ == "__main__":
    """Note that if you are testing locally on dev install, you will likely need
    to change the server port to 8081 since the old UI will be running on 8080.
    Also note that the local base_url is slightly different. 
    """

    config = {
        'base_url': f"http://localhost:{CONDA_STORE_SERVER_PORT}",
        'username': CONDA_STORE_USERNAME,
        'password': CONDA_STORE_PASSWORD,
        'server_port': CONDA_STORE_SERVER_PORT,
    }
    screenshot = False

    # ########################################################################
    # Start playwright and setup
    playwright = sync_playwright().start()
    # Use playwright.chromium, playwright.firefox or playwright.webkit
    # Pass headless=False to launch() to see the browser UI
    # slow_mo adds milliseconds to each playwright command so humans can follow along
    browser = playwright.chromium.launch(headless=False, slow_mo=500)
    page = browser.new_page()

    # Go to http://localhost:{server_port}
    page.goto(config['base_url'], wait_until="domcontentloaded")
    
    # Log in to conda-store
    login_sequence(page)

    # create a new environment
    env_name = create_new_environment(page, screenshot=screenshot)

    # close any open tabs on the conda-store ui
    close_environment_tabs(page)

    # interact with an existing environment
    existing_environment_interactions(page, env_name, screenshot=screenshot)

    browser.close()
    playwright.stop()