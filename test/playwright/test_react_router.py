"""Test app with different types of React routers

- browser router (uses the history API)
- memory router (uses in-app memory)

Ref: https://reactrouter.com/en/main/routers/create-memory-router
"""

import pytest
import re
from playwright.sync_api import Page, expect


@pytest.fixture
def test_config():
    return {"base_url": "http://localhost:8000"}


def test_browser_router_200_ok(page: Page, test_config):
    """With browser router, a known route should show the corresponding view
    """
    # Check that when going to a known route (in this case, the route to create
    # a new environment), the app loads the view for that route.
    page.goto(test_config["base_url"] + "/default/new-environment")

    # We know we are at the correct view (i.e., new environment form) if there
    # is a textbox to enter the name of the new environment.
    expect(page.get_by_role("textbox", name="environment name")).to_be_visible()


def test_memory_router_200_ok():
    """With memory router, all routes are 200 (OK) so there's nothing to test there
    """
    pass


def test_browser_router_404_not_found(page: Page, test_config):
    """With browser router, an unknown route should result in a 404 not found error
    """
    page.goto(test_config["base_url"] + "/this-is-not-an-app-route")
    expect(page.get_by_text("404")).to_be_visible()


def test_memory_router_404_not_found(page: Page, test_config):
    """The memory router has been configured to load the root view at any route
    """
    # The route `/memory-router-test.html` is not a route recognized by the
    # React app. With the browser router, an unknown route would give a 404.
    page.goto(test_config["base_url"] + "/memory-router-test.html")
    expect(page.get_by_test_id("no-environment-selected")).to_be_visible()


def test_browser_router_updates_location(page: Page, test_config):
    """With browser router, following a link should update browser URL
    """
    # Go to root view and verify that it loaded
    page.goto(test_config["base_url"])
    expect(page.get_by_test_id("no-environment-selected")).to_be_visible()

    # Get and click link to "create new environment"
    page.get_by_role("button", name="default").get_by_role(
        "link",
        # Note the accessible name is determined by the aria-label,
        # not the link text
        name=re.compile("new.*environment", re.IGNORECASE),
    ).click()

    # With browser router, the window location should update in response to
    # clicking an app link
    expect(page).to_have_url(re.compile("/default/new-environment"))


def test_memory_router_does_not_update_location(page: Page, test_config):
    """With memory router, following a link should NOT update browser URL
    """
    page.goto(test_config["base_url"] + "/memory-router-test.html")

    # Get and click link to "create new environment"
    page.get_by_role("button", name="default").get_by_role(
        "link",
        # Note the accessible name is determined by the aria-label,
        # not the link text
        name=re.compile("new.*environment", re.IGNORECASE),
    ).click()

    # With memory router, the window location should **not** update in response
    # to clicking an app link
    expect(page).to_have_url(re.compile("/memory-router-test.html"))
