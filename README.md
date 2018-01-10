Based on the requirements, I developed a mobile app that allows for the search and the random location assignment of those individuals selected.

<img width="374" alt="heidi soap search" src="https://user-images.githubusercontent.com/835981/34755665-88318594-f593-11e7-9c31-62faf89b9bdc.png">

The combo box search feature allows for the search of individuals by first and last name and hobbies. The search text is broken into smaller phrases, based on spacing between the words, to be compared against keywords (first and last name and individual hobbies) generated for each individual.  All phrases must, at least, partially match, in order for the individual to be included in the result set.  I had to assume the user would not necessarily know the individual by name and would perfer to find someone with similar or targeted interests/hobbies

Once the user selects an individual, a message will appear indicating the start of location selection and validation processes. For the validation, I only accepted those locations with the geocoding level of HOME_ADDRESS or STREET. 

<img width="366" alt="hiedi soap successfull" src="https://user-images.githubusercontent.com/835981/34755636-449a5f04-f593-11e7-8e08-5321c92cf930.png">

If the location does not meet the criteria or due to the occurence of an error, a message will appear with the details about the error and the instructions to "try again".

<img width="373" alt="34755661-76e4f168-f593-11e7-81d5-fa891d8685f0" src="https://user-images.githubusercontent.com/835981/34755970-a2843160-f595-11e7-90b9-a3ac8151cde5.png">

If successful, a message will appear with instructions to click on the map marker.

<img width="374" alt="heidi soap marker" src="https://user-images.githubusercontent.com/835981/34755678-96ca4096-f593-11e7-8a04-251dbe297a72.png">


Far from perfect, I limited the random location selection to the U.S. because of the high number of false positives when opening the random selection to the world. One approach would be to programmtically automate the search for valid locations-if the attempt fails, then try again until a valid location is generated.  However, the problem, random number generator is non-deterministic and with limited number of request/min to the geocoding service, the response time and the end result would result in a poor user experience.
 
Another approach would be to randomly select from a list of max/min latitudes and longitudes, then randomly select latitudes/longitudes between those max/min values.  Each max and min would represent a range from north to south, east to west-representing a geographical square area.  The square area's size will vary based on how accurately those defined geopraphical areas yield quality addresses i.e. an island-the squares will be smaller in order to capture those addresses along the uneven boundary between land and water. Althought labor and computational intensive compared to other options, in return the data is of higher quality resulting in decrease errors and an increase in usage which adds up to improve user experience.



