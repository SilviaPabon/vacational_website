-- CREATE TABLES SCRIPT 

-- MAIN TABLES
CREATE TABLE USERS(
    usersId INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usersFullname VARCHAR(64) NOT NULL,
    usersUsername VARCHAR(32) NOT NULL,
    usersPassword VARCHAR(128) NOT NULL
); 

CREATE TABLE PLANS(
    plansId INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    plansName VARCHAR(64) NOT NULL, 
    plansDescription VARCHAR(300) NOT NULL, 
    plansCountry VARCHAR(32) NOT NULL, 
    plansPrice FLOAT NOT NULL, 
    plansImageUrl VARCHAR(255) NOT NULL, 
    plansIncludeHotel TINYINT(1) NOT NULL, 
    plansIncludeFlights TINYINT(1) NOT NULL, 
    plansIncludeActivities TINYINT(1) NOT NULL, 
    plansNumPersons INT UNSIGNED NOT NULL, 
    plansDays INT UNSIGNED NOT NULL
); 

CREATE TABLE ROLES(
	rolesId INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    rolesDescription VARCHAR(32) NOT NULL
); 

-- RELATIONS TABLES
CREATE TABLE usersHasRoles(
	userId INT UNSIGNED NOT NULL, 
    roleId INT UNSIGNED NOT NULL,
    
    CONSTRAINT fk_users_roles_users FOREIGN KEY (userId) REFERENCES USERS(usersId), 
    CONSTRAINT fk_users_roles_roles FOREIGN KEY (roleId) REFERENCES ROLES(rolesId)
); 

CREATE TABLE COMMENTS(
    commentsId INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    commentsDescription VARCHAR(384) NOT NULL,
    commentsDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    usersId INT UNSIGNED NOT NULL,
    plansId INT UNSIGNED NOT NULL, 
    
    CONSTRAINT fk_comments_users FOREIGN KEY (usersId) REFERENCES USERS(usersId),
    CONSTRAINT fk_comments_plans FOREIGN KEY (plansId) REFERENCES PLANS(plansId)
);

CREATE TABLE RESERVATIONS(
    reservationsId INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    reservationsDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usersId INT UNSIGNED NOT NULL,
    plansId INT UNSIGNED NOT NULL, 
    
    CONSTRAINT fk_reservations_users FOREIGN KEY (usersId) REFERENCES USERS(usersId),
    CONSTRAINT fk_reservations_plans FOREIGN KEY (plansId) REFERENCES PLANS(plansId)
);

-- Initial inserts

-- ######### PLANS ##########
INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("7 Canadian rivers on the road", 
"Enjoy this plan in which you will travel all over Canada by road, visiting the 7 best-known rivers in the country. With this plan you will have the opportunity to have an encounter with nature while getting to know the culture of some Canadian cities.",
"Canadá", 
530.00, 
"https://i.ibb.co/Wk9YTQq/canadian-rivers.jpg", 
1, 
1,
1,
1,
7); 

INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("Ancient forest exploration", 
"Enjoy the best natural experience you could imagine. Delve into the ancient forest and get to know its caves, rivers, waterfalls, animals and other natural environments. In addition to the above, you will live the experience of living in local cabins.", 
"United States", 
360.00, 
"https://i.ibb.co/Mpc1qqc/ancient-forest.jpg", 
1, 
1,
1,
1,
5); 

INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("Safari experience", 
"Enjoy a guided experience in the bush savanna of Kenya. With this plan, you will have close experiences with the animals that inhabit the territory (don't worry, your safety is the most important thing for us). You will also live with locals in the area.", 
"Kenya", 
430.00, 
"https://i.ibb.co/Z89qY6J/safari-experience.jpg", 
1, 
1,
1,
1,
7); 

INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("Diving experience", 
"Live the unique experience of diving in your own flesh, with this plan, you will be able to know aspects of the local culture of the country and immerse yourself in the ocean to know the marine flora and fauna of the place. Believe us, it will be an unforgettable experience.", 
"Solomon Islands", 
460.00, 
"https://i.ibb.co/JnNkdqG/diving-experience.jpg", 
1, 
1,
1,
1,
5); 

INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("Discover Perú", 
"With this vacation plan, you will get to know the most important tourist sites in Peru, among which are Cuzco, Machu Picchu, the Vinicunca mountains and many more. You will also know first-hand the typical food of the country.", 
"Perú", 
310.00, 
"https://i.ibb.co/pjzS8Wt/vinincunca-peru.jpg", 
1, 
1,
1,
2,
7); 

INSERT INTO PLANS (plansName, plansDescription, plansCountry, plansPrice, plansImageUrl, plansIncludeHotel, plansIncludeFlights, plansIncludeActivities, plansNumPersons, plansDays) 
VALUES("Cairo inmmersion", 
"Meet the famous pyramids of Egypt! But it is not the only thing, with this plan you will also visit the recent National Museum of Egyptian Civilization, the Khan el-Khalili market, the citadel of Cairo, the Al-Azhar Mosque and some other important structures for Egyptian culture.", 
"Egypt", 
310.00, 
"https://i.ibb.co/txcsBFv/cairo-inmmersion.jpg", 
1, 
1,
1,
1,
7); 

-- ########## ROLES ##########
INSERT INTO ROLES (rolesDescription) VALUES ("Admin"); 
INSERT INTO ROLES (rolesDescription) VALUES ("User"); 
