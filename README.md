# Files Fire

Files Fire is a proof of concept, 
that uses the new [Material-UI](https://material-ui.com) version and 
[Firebase](https://firebase.google.com) in React.

![Alt text](.github/Files-Fire.gif?raw=true "Files Fire")

## Getting Started

### 1. Clone the project
```
git clone https://github.com/kadukeitor/files-fire.git
```

### 2. Move to the project
```
cd files-fire
```

### 3. Install the dependencies
```
npm install
```

### 4. Create and complete the configuration file
```
cp .env.example .env
```

### 5. Run the project
```
npm start
```

## TODO

* Integrate a mime-type library
* Controlling the number of files that the user can upload.

## Firebase

### Firestore

#### Rules

```
service cloud.firestore {
  match /databases/{database}/documents {
		match /users/{userId}/{allDocuments=**} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

### Storage

#### Rules

```
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId
                    && request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

## Demo

Check the demo [here](https://kadukeitor.github.io/files-fire/)