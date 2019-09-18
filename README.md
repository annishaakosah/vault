

# SWEN325 - Vault Application

This is a TV show manager application that Annisha Akosah (300399598) and Sam Ong (300363819) created for our mobile app development course, SWEN325. We are Poopy Software™ 💩

**View a demo of our app [here](https://www.youtube.com/watch?v=vg38gwwyOI8&)**

## How to run the application

This app uses the ionic 3 framework.

```
Ionic:

   Ionic CLI          : 5.2.4
   Ionic Framework    : ionic-angular 3.9.5
   @ionic/app-scripts : 3.2.2

Cordova:

   Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
   Cordova Platforms : ios 5.0.1
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 4.1.1, (and 6 other plugins)

Utility:

   cordova-res : 0.6.0 
   native-run  : not installed

System:

   NodeJS : v10.16.0
   npm    : 6.9.0
```

1. Clone the git repository

```
git clone https://gitlab.ecs.vuw.ac.nz/ongsama/vault.git
```

2. Navigate into the folder

```
cd vault
```

3. Install dependencies

```
npm install
```

4. Run the application in your browser

```
ionic serve
```

5. Explore the application at `http://localhost:8100/`

Enjoy!

## Notes about external components

We used firebase for authentication and cloud storage. 

We used the [TMDB API](https://developers.themoviedb.org/3) for our TV show database.

## Screens and functions

**Key:**
<table>
<tr>
    <td>Sam:</td>
    <td>🦑</td>
</tr>
<tr>
    <td>Annisha:</td>
    <td>💦</td>
</tr>
</table>

- **Splash Screen**
    - 💦 Logo
    - 🦑 Styling

- **Login**
    - 💦 Styling 
    - 🦑 Backend authentication
    - 🦑 Loading modal

- **Signup**
    - 💦 Styling
    - 🦑 Backend authentication 
    - 🦑 Loading modal
    - 🦑 Firestore storage

- **My Vault**
    - 🦑 Styling
    - 🦑 Firestore access
    - 🦑 Long press overlay
    - 🦑 Slide Swipe between segments

- **Discover**
    - 💦 Styling 
    - 🦑 Loading modal
    - 🦑 API call
    - 🦑 Refresher
    - 🦑 Infinite scroll (load more)
    - 🦑 Add to watch list

- **Filter**
    - 🦑 Choose genre

- **Search**
    - 💦 Styling 
    - 💦 API call
    - 🦑 Add to watch list
    - 💦 View show

- **Settings**
    - 🦑 Styling

- **TV show details**
    - 💦 Styling
    - 🦑 Add to watch list
    - 🦑 Add to already watched
    - 💦 Share TV show with friends
    - 💦 View Episode list

- **Episode list**
    - 💦 Styling
    - 💦 Populate seasons and episode list
    - 💦 View Episode details

- **Episode details**
    - 💦 Styling
    - 💦 Episode/season progress
    - 💦 Share episode with friends
    - 💦 View Tv show information

- **About**
    - 🦑 Styling
    - 🦑 Link to GitLab

- **Change password**
    - 🦑 Styling
    - 🦑 Firebase update


## Components we used

1. ion-header
2. ion-toolbar
3. ion-content
4. ion-label
5. ion-navbar
6. ion-title
7. ion-item
8. ion-icon
9. ion-input
10. ion-buttons
11. ion-button
12. ion-select
13. ion-option
14. ion-scroll
15. ion-refresher
16. ion-grid
17. ion-row
18. ion-col
19. ion-infinite-scroll
20. ion-item-group
21. ion-item-divider
22. ion-segment
23. ion-segment-button
24. ion-slides
25. ion-slide
26. ion-searchbar
27. ion-tab

1. LoadingController
2. NavController
3. ActionSheetController
4. LongPress
5. ViewChild

# Features for version 2.0

These are features that we didn't have time to include in our app but would have liked to:

- Grid/list view
- Reorder shows in my vault
- TV show recommendations
- Advanced search
- Calendar
- Push notifications for new episodes
- View TV show cast
- Swipe between tv shows/episodes
- Give TV shows a rating
- Add support for movies
- Be able to view friend's watch lists



Thanks from the team at Poopy Software™ 💩
