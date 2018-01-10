Based on the requirements, I developed a mobile app that allows for the search and the random location assignment of those individuals selected.

<img width="374" alt="heidi soap search" src="https://user-images.githubusercontent.com/835981/34755665-88318594-f593-11e7-9c31-62faf89b9bdc.png">

The combo box search feature allows for the search of the individual by first and last name and hobbies. The search text is broken into smaller phrases, based on spacing between the words, to be compared against keywords (first and last name and individual hobbies) generated for each individual.  All phrases must, at least, partially match, in order for the individual to be included in the result set.  I had to assume the user would not necessarily know the individual by name and would perfer to find someone with similar interests/hobbies

Once the user selects an individual, a message will appear indicating the start of location selection and validation processes. For the validation, I only accepted those locations with the geocoding level of home address or street. 

<img width="366" alt="hiedi soap successfull" src="https://user-images.githubusercontent.com/835981/34755636-449a5f04-f593-11e7-8e08-5321c92cf930.png">

If the location does not meet the criteria or any other errors, an error message will appear with the error and the instructions to "try again".

<img width="373" alt="34755661-76e4f168-f593-11e7-81d5-fa891d8685f0" src="https://user-images.githubusercontent.com/835981/34755970-a2843160-f595-11e7-90b9-a3ac8151cde5.png">

 If successful, a message will appear on instructions to click on the map marker.

<img width="374" alt="heidi soap marker" src="https://user-images.githubusercontent.com/835981/34755678-96ca4096-f593-11e7-8a04-251dbe297a72.png">


 Far from perfect, I limited the random location selection to the U.S. because of the high number of false positives when opening the random selection to the world. One approach would be to programmtically automate the search for valid locations-if the attempt fails, then try again until a positive location.  The problem, random numbers are non-deterministic and with the limited number of request/min to the geocoding services, the response time and the end result would result in a poor user experience.
 
 Another approach would be to randomly select from a list of max/min latitudes and longitudes, then randomly select latitudes/longitudes between those max/min values.  Each max and min would represent a range from north to south, east to west-representing a geographical square area.  The square area's size will vary based on how accurately those defined geopraphical areas yield quality locations i.e. island-the squares will be smaller in order to capture those addresses along the uneven boundaries.



