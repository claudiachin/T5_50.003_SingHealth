import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from random import choice

if __name__ == "__main__":
    driver=webdriver.Chrome(ChromeDriverManager().install())
    driver.get('https://claudiachin.github.io/T5_50.003_SingHealth/src/html/announcements.html')
    driver.maximize_window()
    auditorselector =  driver.find_element_by_xpath("//*[@id=\"loginBG\"]/div[1]/div[1]/button[1]")
    auditorselector.click()
    time.sleep(2)
    driver.find_element_by_id("email").send_keys("test@mymail.sutd.edu.sg")
    driver.find_element_by_id("pword").send_keys("123456789")
    driver.find_element_by_id("clickLogin").click()
    time.sleep(3)
    driver.find_element_by_id("annoucements").click()
    time.sleep(2)
    button = driver.find_element_by_id("make-announcement-button")
    time.sleep(2)
    button.click()
    time.sleep(2)
    driver.find_element_by_xpath("//a[@href]").click()
    time.sleep(3)
    links = driver.find_elements_by_xpath("//div[contains(@class, 'card')]")
    time.sleep(2)
    for i in range(0,len(links)):
        try:
            links[i].click()
            time.sleep(7)
            driver.find_element_by_xpath("//a[@href]").click()
            time.sleep(3)
            links = driver.find_elements_by_xpath("//div[contains(@class, 'card')]")
        except StaleElementReferenceException as Exception:
            print('StaleElementReferenceException caught')
    driver.close()