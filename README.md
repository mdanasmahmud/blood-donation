# blood-donation
Blood Donation Website With React and Nodejs along with Tailwind

NOTE: The styling is not near complete and only the structural integrity has been built. The website will be heavily styled and fixed alignment after all the features has been added. The website will be deployed upon completion.

# Screenshots 

Note: This is not the final product and more styles to be made and only showing the core pages for now.

Homepage: 

![blood-donation homepage](https://github.com/mdanasmahmud/blood-donation/assets/83706252/e1a8ca84-5152-4f56-add5-b63690c8b48d)

Find Blood Donor:

![blood-donation map](https://github.com/mdanasmahmud/blood-donation/assets/83706252/dfd24329-9488-41f1-b8f5-366440d678c4)

Blood Needed:

![blood-donation blood needed](https://github.com/mdanasmahmud/blood-donation/assets/83706252/c0450beb-660a-4c02-829c-6c6be1e55155)

User Dashboard:

![blood-donation userdashboard](https://github.com/mdanasmahmud/blood-donation/assets/83706252/c8fe795d-78ae-44c6-a3d1-101690911977)


# Features Included

1. Users can register and login and can logout anytime they want using JWT tokenization.
2. User can post about a patient that needs donation and other users can apply for the donation by filling the eligible form.
3. User who posted about the patient can see the information about the patient that are willing to donate.
4. User can see the available blood donors on the map. (Note: The backend server will automatically capture the geolocation of the user viewing the map and show donors around them)
5. Any user can apply to be a donor and their information will be added to the list.
6. The map is interactive and upon clicking on the marker it will show the geo human readable location to the user as it was made with openmap which is a free public based api map.

# Feature planned to be added

1. Users who apply for blood donation for any patient, their information will be added to their user dashboard.
2. Creation of an admin pannel, the admin will control everything and can remove any content or user.
3. News are currently showed statically but will be showed dynamically as the backend model schema and controller has already been created.
4. Add more information to the about page and to be able to send email the admin by completing the form.
