# TechCrunch Bot 
Discord Bot that gets the latest TechCrunch news and sends a message in a channel for everyone

1. Fetches latest news from TechCrunch using https://newsapi.org JSON Returned API
2. 


Personal Doc:

Timer that will check the API every 60 seconds

  Requests API JSON, stores in currentNews object
  Compares currentNews to locally stored JSON file 
    If there is new news using the publishedAt
    Shout into the channel the URL
    Update local JSON file with currentNews
  
    If this object date == latest object date 
      Do not update
    Else 
      Update
      
      
Discord command to check manually 

