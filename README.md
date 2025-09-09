This project was developed and tested with the following environment:

- **React Native:** 0.81.1
- **React:** 19.1.0
- **Node.js:** >=20
- **Yarn or npm**: latest stable
- **Android SDK:** 34 (or your local SDK version)
- **iOS Deployment Target:** 16+ (if applicable)
- **React Native CLI:** 0.81.1
- **Gradle:** recommended version for RN 0.81.1
- **Async Storage:** @react-native-async-storage/async-storage ^2.2.0
- **Navigation:** 
  - @react-navigation/native ^7.1.17
  - @react-navigation/native-stack ^7.3.26
  - @react-navigation/bottom-tabs ^7.4.7
- **UI & Utilities:** 
  - react-native-linear-gradient ^2.8.3
  - react-native-safe-area-context ^5.6.1
  - react-native-screens ^4.16.0
  - react-native-svg ^15.12.1
  - react-native-uuid ^2.0.3
- **State Management:** zustand ^5.0.8
- **TypeScript:** ^5.9.2
- **Babel:** @babel/core ^7.25.2
- **Testing:** jest ^29.6.3, @types/jest ^30.0.0, react-test-renderer 19.1.0

- **Note**
- Home page when clicking on each note it will show full content of that note so that users can easily visualize the information before going to the detail section.

- In the NewNoteScreen section, I changed the interface when adding a new note. Instead of letting the user choose from the picker, I rendered available types to minimize user operations and give users a more intuitive view of the types they have. I added a section for the number of characters entered so that users can see that their notes do not exceed the allowed characters,only 200 characters can be entered.

- For the Summary screen, I have changed the interface compared to figma to separate the layout clearly for each type of note, so that users can see it clearly and easily. I have added a SummaryDetailScreen so that when users click on the detail button, they will see all the notes of that type.

- Regarding Settings, I have handled the link event via website.

- Finally, the UI part is changed differently from Figma, please give feedback so I can edit the interface according to the design.


