# Time
Begin: 9/7/2024 3h50pm

Spent: 1 hour 30 minute

# Clarification and Assumption

Score board i'm not sure about this feature for user or always show on website, it's like show for user or guest who everybody when access website will show on the homepage, i assume it's for everybody and always show on homepage, but the score feature can scaling to more feature like 

User can do an action, this api could be a something functionality, but after finishing a api, will increases points, i assume this website can has too many action APIs, but in this scope, i only do for one action

Above 2 assumptions, i decide to use:
+ Architecture: Monolith and has 2 server (write and read)
+ Database: Relationship and apply a Master - Slave

I assume user must have an account to do action and every user has just one score information

I assume this website has more than 1 millions people accesses per day, each person do 10 actions per day:
+ Total request per day: 10 million, 
+ Total request per second: 116


**Conclusion**:
- API:
  - GET /score/top10
  - POST /actions
- Monolith
  - Read server
  - Write server
- Database:
  - Relationship
  - Master Slave
- Request per time:
  - day: 10 million
  - second: 116 

# Database Structure

User table
- id: string (PK)
- email: string
- password: string
- name: string
- score: string

