import pytest


def pytest_addoption(parser):
    parser.addoption("--screenshots", action="store", default="false")

@pytest.fixture(scope="session")
def screenshot(pytestconfig):
    if pytestconfig.getoption("screenshots") == 'false':
        return False
    else:
        return True

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "record_video_dir": "test-results/videos/",
    }
