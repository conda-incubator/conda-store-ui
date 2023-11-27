import pytest

from playwright.sync_api import expect

DEFAULT_TIMEOUT = 30_000  # time in ms

expect.set_options(timeout=DEFAULT_TIMEOUT)

def pytest_addoption(parser):
    parser.addoption("--screenshots", action="store", default="false")

@pytest.fixture(scope="session")
def screenshot(pytestconfig):
    if pytestconfig.getoption("screenshots") == 'false':
        return False
    else:
        return True
