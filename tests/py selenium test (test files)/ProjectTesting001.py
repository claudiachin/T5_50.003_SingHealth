import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from random import choice

if __name__ == "__main__":
    driver=webdriver.Chrome(ChromeDriverManager().install())
    driver.get('https://claudiachin.github.io/T5_50.003_SingHealth/src/html/announcement_editor.html')
    #driver.maximize_window()
    driver.find_element_by_id("count_value_title").send_keys('Test 001 - Fill in all input fields')
    time.sleep(1)
    driver.find_element_by_id("count_value").send_keys('The idea behind this test concerns the announcement_editor.html, where the test automatically fills all the relevant fields (announcement_title, and announcement_description), and automatically clicks the Post button to upload the announcement as a document to the firebase database')
    time.sleep(2)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    driver.find_element_by_id("post-announcement-button").click()
    time.sleep(3)
    driver.close()
