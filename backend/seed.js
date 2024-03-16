async function seedDatabase(users) {
    try {
        for (let user of users) {
            const response = await fetch("http://localhost:5001/api/v1/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`Failed to add user ${user.username}`);
            }

            console.log(`User ${user.username} added successfully.`);
        }
        console.log("All users added successfully.");
    } catch (error) {
        console.error("Error while seeding database:", error);
    }
}

const users = [
    {
        "username": "coolboy@mail.com",
        "firstName": "Cool",
        "lastName": "Boy",
        "password": "coolboy"
    },
    {
        "username": "johndoe@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "password": "johndoe"
    },
    {
        "username": "janedoe@example.com",
        "firstName": "Jane",
        "lastName": "Doe",
        "password": "janedoe"
    },
    {
        "username": "mikesmith@example.com",
        "firstName": "Mike",
        "lastName": "Smith",
        "password": "mikesmith"
    },
    {
        "username": "emilyjones@example.com",
        "firstName": "Emily",
        "lastName": "Jones",
        "password": "emilyjones"
    },
    {
        "username": "davidbrown@example.com",
        "firstName": "David",
        "lastName": "Brown",
        "password": "davidbrown"
    },
    {
        "username": "sarahwilliams@example.com",
        "firstName": "Sarah",
        "lastName": "Williams",
        "password": "sarahwilliams"
    },
    {
        "username": "alexthomas@example.com",
        "firstName": "Alex",
        "lastName": "Thomas",
        "password": "alexthomas"
    },
    {
        "username": "laurasmith@example.com",
        "firstName": "Laura",
        "lastName": "Smith",
        "password": "laurasmith"
    },
    {
        "username": "robertjohnson@example.com",
        "firstName": "Robert",
        "lastName": "Johnson",
        "password": "robertjohnson"
    },
    {
        "username": "amandawilson@example.com",
        "firstName": "Amanda",
        "lastName": "Wilson",
        "password": "amandawilson"
    },
    {
        "username": "peterdavis@example.com",
        "firstName": "Peter",
        "lastName": "Davis",
        "password": "peterdavis"
    },
    {
        "username": "sophiasanchez@example.com",
        "firstName": "Sophia",
        "lastName": "Sanchez",
        "password": "sophiasanchez"
    },
    {
        "username": "chrislee@example.com",
        "firstName": "Chris",
        "lastName": "Lee",
        "password": "chrislee"
    },
    {
        "username": "elizabethmartinez@example.com",
        "firstName": "Elizabeth",
        "lastName": "Martinez",
        "password": "elizabethmartinez"
    },
    {
        "username": "danielwhite@example.com",
        "firstName": "Daniel",
        "lastName": "White",
        "password": "danielwhite"
    },
    {
        "username": "hannahadams@example.com",
        "firstName": "Hannah",
        "lastName": "Adams",
        "password": "hannahadams"
    },
    {
        "username": "matthewrodriguez@example.com",
        "firstName": "Matthew",
        "lastName": "Rodriguez",
        "password": "matthewrodriguez"
    },
    {
        "username": "oliviataylor@example.com",
        "firstName": "Olivia",
        "lastName": "Taylor",
        "password": "oliviataylor"
    },
    {
        "username": "jacobthomas@example.com",
        "firstName": "Jacob",
        "lastName": "Thomas",
        "password": "jacobthomas"
    },
    {
        "username": "madisonrobinson@example.com",
        "firstName": "Madison",
        "lastName": "Robinson",
        "password": "madisonrobinson"
    },
    {
        "username": "christopherhill@example.com",
        "firstName": "Christopher",
        "lastName": "Hill",
        "password": "christopherhill"
    },
    {
        "username": "sophieking@example.com",
        "firstName": "Sophie",
        "lastName": "King",
        "password": "sophieking"
    },
    {
        "username": "ethanjames@example.com",
        "firstName": "Ethan",
        "lastName": "James",
        "password": "ethanjames"
    },
    {
        "username": "zoewalker@example.com",
        "firstName": "Zoe",
        "lastName": "Walker",
        "password": "zoewalker"
    },
    {
        "username": "williamscott@example.com",
        "firstName": "William",
        "lastName": "Scott",
        "password": "williamscott"
    }
]

seedDatabase(users);