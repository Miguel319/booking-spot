const Rental = require("../models/rental");
const User = require("../models/user");

class DummyDb {
  rentals;
  users;

  constructor() {
    this.createRentals();
    this.createUsers();
  }

  private createRentals() {
    this.rentals = [
      {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }
    ];
  }

  private createUsers() {
    this.users = [
      {
        username: "Test",
        email: "test@gmail.com",
        password: "testtest"
      }
    ];
  }

  async cleanDb() {
    await User.deleteMany();
    await Rental.deleteMany();
  }

  addRentalsToDb() {
    const user = new User(this.users[0]);

    for (let rental of this.rentals) {
      const newRental = new Rental(rental);
      newRental.user = user;
      
      user.rentals.push(newRental);

      newRental.save();
    }
    user.save();
  }

  async seedToDb() {
    await this.cleanDb();
    this.addRentalsToDb();
  }
}

module.exports = DummyDb;
