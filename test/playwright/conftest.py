import pytest


def pytest_addoption(parser):
    parser.addoption("--screenshot", action="store", default="false")

@pytest.fixture(scope="session")
def screenshot(pytestconfig):
    if pytestconfig.getoption("screenshot") == 'false':
        return False
    else:
        return True
