import pytest


def pytest_addoption(parser):
    parser.addoption("--screenshots", action="store", default="false")

@pytest.fixture(scope="session")
def screenshot(pytestconfig):
    if pytestconfig.getoption("screenshots") == 'false':
        return False
    else:
        return True
