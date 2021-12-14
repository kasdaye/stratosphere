# For Users

## Running Stratosphere
Download the latest build, unzip, and run index.html in your favourite browser.

## Creating a Stratagem JSON file
```
[
    {
        "name": "Stratagem A",
        "cost": "1",
        "description": "Description A",
        "phases": [
            "Shooting",
            "Fight"
        ],
        "tags": [
            "Evil Marines"
        ]
    },
    {
        "name": "Stratagem B",
        "cost": "2",
        "description": "Description B",
        "phases": [
            "Fight"
        ],
        "tags": [
            "Even More Evil Faction",
            "Even More Evil Marines"
        ]
    }
]
```

Valid values for the "phases" array are:
* "Before Battle"
* "Command"
* "Movement"
* "Psychic"
* "Shooting"
* "Charge"
* "Fight"
* "Morale"
* "Opponent's Movement"
* "Opponent's Psychic"
* "Opponent's Shooting"
* "Opponent's Charge"

## Creating a Army List JSON file
```
[
    {
        "key": 2,
        "customName": "Roberta Robertsdottir",
        "name": "Evil Marine Leader",
        "tags": [
            "Evil Marines"
        ]
    },
    {
        "key": 3,
        "customName": "Bob Bobson",
        "name": "Even More Evil Gruntc",
        "tags": [
            "Even More Evil Faction",
            "Even More Evil Marines"
        ]
    }
]
```
* "key" must start at 2 and be incremented.
* The "tags" entered here should be consistent with the "tags" in the Stratagems JSON file.

# For Developers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.