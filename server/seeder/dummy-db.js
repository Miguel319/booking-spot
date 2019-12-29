var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Rental = require("../models/rental");
var User = require("../models/user");
var DummyDb = /** @class */ (function () {
    function DummyDb() {
        this.createRentals();
        this.createUsers();
    }
    DummyDb.prototype.createRentals = function () {
        this.rentals = [
            {
                title: "Nice view on ocean",
                city: "San Francisco",
                street: "Main street",
                category: "condo",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
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
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
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
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 5,
                shared: true,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23
            }
        ];
    };
    DummyDb.prototype.createUsers = function () {
        this.users = [
            {
                username: "Test",
                email: "test@gmail.com",
                password: "testtest"
            },
            {
                username: "John",
                email: "john@gmail.com",
                password: "johnjohn"
            }
        ];
    };
    DummyDb.prototype.cleanDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.deleteMany()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Rental.deleteMany()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DummyDb.prototype.addRentalsToDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, user2, _i, _a, rental, newRental;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = new User(this.users[0]);
                        user2 = new User(this.users[1]);
                        for (_i = 0, _a = this.rentals; _i < _a.length; _i++) {
                            rental = _a[_i];
                            newRental = new Rental(rental);
                            newRental.user = user;
                            user.rentals.push(newRental);
                            newRental.save();
                        }
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, user2.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DummyDb.prototype.seedToDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cleanDb()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.addRentalsToDb()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DummyDb;
}());
module.exports = DummyDb;
