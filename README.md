1. What the app does:

Allows the user to post messages, vote messages up and down, delete messages, search messages, sort messages by votes or date posted, and edit messages.

2. How to use the app:

Enter new messages in the text box provided and click post message to confirm. Voting and message deleting is controlled by the buttons on the left of each message. To edit a message, click the text and a pop-up box allows you to edit it. Select options from the dropdown menus to control the sort method for the message list. Enter search text into the search box to find text within each message.

3. Approach taken:

I separated the message board into key components and built up from there. Used a separate component for parts of the app which need to be hidden (i.e. Edit Message box). Used the underlying styling and added some overlay styling to make the app more user friendly.

4. Installation instructions:

Unsure?

5. Unsolved problems:

I tried to use ternary operators to control which sort method is used but couldn't get it to work. Instead I used a sort method which I apply to the messages array before it's filtered and mapped to the message board.
