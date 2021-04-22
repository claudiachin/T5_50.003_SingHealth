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
    time.sleep(4)
    driver.find_element_by_id("annoucements").click()
    time.sleep(2)
    button = driver.find_element_by_id("make-announcement-button").click()
    time.sleep(2)
    driver.find_element_by_id("count_value_title").send_keys('Selenium Testing - Automated Report')
    time.sleep(1)
    driver.find_element_by_id("count_value").send_keys('The idea behind this test concerns the announcement_editor.html, where the test automatically fills all the relevant fields (announcement_title, and announcement_description), and automatically clicks the Post button to upload the announcement as a document to the firebase database')
    time.sleep(2)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    driver.find_element_by_id("post-announcement-button").click()
    time.sleep(7)
    links = driver.find_elements_by_xpath("//div[contains(@class, 'card')]")
    time.sleep(2)
    for i in range(0,1):
        try:
            links[i].click()
            time.sleep(7)
            driver.find_element_by_xpath("//a[@href]").click()
            time.sleep(3)
            links = driver.find_elements_by_xpath("//div[contains(@class, 'card')]")
        except StaleElementReferenceException as Exception:
            print('StaleElementReferenceException caught')
    driver.close()