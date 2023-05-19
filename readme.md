## Twitter backend system

### Requirements

- User Management
    - [ ] Handle user registration and authentication.
    - [ ] Manage user profiles, including usernames, email addresses, and profile information.

- Tweet Management
    - [ ] Enable users to create, post, and delete tweets.
    - [ ] Handle storage and retrieval of tweets.
    - [ ] Pagination on tweets
    - [ ] Implement features like hashtags, and media attachments.

- Timeline and Feed Generation
    - [ ] Generate personalized timelines for each user, displaying tweets from the users they follow.

- Follow and Unfollow
    - [ ] Enable users to follow and unfollow other users.
    - [ ] Update user timelines based on their following relationships.

- Interactions and Engagement
    - [ ] Only the person who follows the author can comment/like
    - [ ] we can like the comments and comment on the comments [ nested comments ].
    - [ ] Retweet

## project setup
- Clone the project on your local
- execute `npm install` on the same pathof root directory of the downloaded project
- create a `.env` file in your root directory and create the following environment variables
    - `PORT=3000`
    - `DATABSE_URL=<YOUR_MONGODB_DATABASE_URL>`
    - `JWT_SECRET=<YOUR_SECRET>`
    - `AWS_REGION=<YOUR_AWS_REGION>`
    - `SECRET_ACCESS_KEY = <AWS_SECRET_aCCESS_KEY>`
    - `ACCESS_KEY_ID = <AWS_KEY_ID>`
    - `BUCKET_NAME = <BUCKET_NAME>`


