# socialmediatracker

A minimalist Twitter analytics tool built using D3 with the MEAN stack.

I wanted to create a social media analytics tool where you can search anyone that's public (not just your own profile), don't have to signup/login, and don't have to pay. Currently it only has twitter.

It creates a bar chart with two bars for each tweet. The bars show the number of retweets and favorites for each tweet. I made the D3 charts responsive (that wasn't easy) so it limits the data size based on the screen size so as to not overcrowd the chart.

Every time a new user is searched they get added to my DB. I then get the accounts current follower total from Twitter on a regular basis and plot that on another responsive chart with D3. Twitter doesn't keep track of follower history so I had to figure out a way to do it myself (also hard).

In the future I'd like to add a heatmap with D3 for geo tagged retweets and favorites so you can see where your users are interacting from.
