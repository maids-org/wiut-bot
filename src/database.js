"use strict";
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
exports.__esModule = true;
var path_1 = require("path");
var fs = require("fs");
var node_fetch_1 = require("node-fetch");
var Database;
(function (Database) {
    var _this = this;
    Database.Constants = {
        EDIT_LINK: "https://github.com/mad-maids/maid.table"
    };
    Database.Online = function (url) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var Offline = /** @class */ (function () {
        function Offline(type, defaults) {
            this.type = type;
            if (!fs.existsSync((0, path_1.join)("data")))
                fs.mkdirSync((0, path_1.join)("data"));
            if (!fs.existsSync((0, path_1.join)("data", this.type + ".json")))
                fs.writeFileSync((0, path_1.join)("data", this.type + ".json"), JSON.stringify(defaults));
            this.path = (0, path_1.join)("data", type + ".json");
        }
        Offline.prototype.read = function () {
            return JSON.parse(fs.readFileSync((0, path_1.join)(this.path), {
                encoding: "utf8"
            }));
        };
        Offline.prototype.write = function (data) {
            fs.writeFileSync((0, path_1.join)(this.path), JSON.stringify(data), {
                encoding: "utf8"
            });
        };
        return Offline;
    }());
    Database.Offline = Offline;
    var User = /** @class */ (function () {
        function User(data) {
            if (typeof data === "number") {
                this._id = data;
                this.messages = [];
                this.photos = [];
                this._admin = false;
                this._banned = false;
            }
            else if (typeof data === "object") {
                this._id = data._id;
                this.messages = data.messages;
                this.photos = data.photos;
                this._admin = data._admin;
                this._banned = data._banned;
            }
            else
                throw new Error("Invalid data type");
        }
        Object.defineProperty(User.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "admin", {
            get: function () {
                return this._admin;
            },
            set: function (value) {
                this._admin = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "banned", {
            get: function () {
                return this._banned;
            },
            set: function (value) {
                this._banned = value;
            },
            enumerable: false,
            configurable: true
        });
        User.prototype.addMessage = function (message) {
            this.messages.push(message);
        };
        User.prototype.getMessage = function (index) {
            return this.messages[index];
        };
        User.prototype.getMessages = function () {
            return this.messages.join("\n");
        };
        User.prototype.resetMessages = function () {
            this.messages = [];
        };
        User.prototype.addPhoto = function (photo) {
            this.photos.push(photo);
        };
        User.prototype.getPhoto = function (index) {
            return this.photos[index];
        };
        User.prototype.getPhotos = function () {
            return this.photos;
        };
        User.prototype.resetPhotos = function () {
            this.photos = [];
        };
        User.prototype.getId = function () {
            return this.id;
        };
        return User;
    }());
    Database.User = User;
    var Users = /** @class */ (function () {
        function Users() {
            var _this = this;
            this.database = new Offline("users", {
                users: []
            });
            if (this.database.read().users.length !== 0) {
                this.users = this.database.read().users.map(function (user) {
                    return new User(user);
                });
            }
            else {
                this.users = [];
            }
            this.users.forEach(function (user) {
                if (user.admin) {
                    _this.admins = [];
                    _this.admins.push(user);
                }
                if (user.banned) {
                    _this.banned = [];
                    _this.banned.push(user);
                }
            });
            if (this.admins === undefined) {
                this.admins = [];
            }
            if (this.banned === undefined) {
                this.banned = [];
            }
        }
        Users.prototype.addUser = function (user) {
            // Check if user already exists
            if (this.users.find(function (u) { return u.getId() === user.getId(); })) {
                throw new Error("User already exists");
            }
            // Add it to the storage
            this.users.push(user);
            this.database.write({
                users: this.users
            });
        };
        Users.prototype.deleteUser = function (user) {
            // Check if user exists
            if (!this.users.find(function (u) { return u.getId() === user.getId(); })) {
                throw new Error("User does not exist");
            }
            // Delete it from the storage
            this.users = this.users.filter(function (u) { return u.getId() !== user.getId(); });
            this.database.write({
                users: this.users
            });
        };
        Users.prototype.getUser = function (id) {
            return this.users.find(function (u) { return u.getId() === id; });
        };
        Users.prototype.getUsers = function () {
            return this.users;
        };
        Users.prototype.getAdmins = function () {
            return this.admins;
        };
        Users.prototype.setAdmin = function (user, value) {
            if (!this.users.find(function (u) { return u.getId() === user.getId(); })) {
                throw new Error("User does not exist");
            }
            this.users.find(function (u) { return u.getId() === user.getId(); }).admin = value;
            value
                ? this.admins.push(user)
                : (this.admins = this.admins.filter(function (u) { return u.getId() !== user.getId(); }));
            this.database.write({
                users: this.users
            });
        };
        Users.prototype.setBanned = function (user, value) {
            if (!this.users.find(function (u) { return u.getId() === user.getId(); })) {
                throw new Error("User does not exist");
            }
            this.users.find(function (u) { return u.getId() === user.getId(); }).banned = value;
            value
                ? this.banned.push(user)
                : (this.banned = this.banned.filter(function (u) { return u.getId() !== user.getId(); }));
            this.database.write({
                users: this.users
            });
        };
        return Users;
    }());
    Database.Users = Users;
    var Time = /** @class */ (function () {
        function Time() {
            this.time = new Date();
            this.uzbTime = new Date();
            this.uzbTime.setHours(this.time.getUTCHours() + 5);
        }
        Time.prototype.updateTime = function () {
            this.time = new Date();
            this.uzbTime = new Date();
            this.uzbTime.setHours(this.time.getUTCHours() + 5);
        };
        Time.prototype.getTime = function () {
            return this.time;
        };
        Time.prototype.getUzbTime = function () {
            return this.uzbTime;
        };
        Time.prototype.getTimeString = function () {
            return this.time.toLocaleString("en-US", {
                hour12: false,
                timeZone: "UTC"
            });
        };
        Time.prototype.getUzbTimeString = function () {
            return this.uzbTime.toLocaleString("uz-Latn-UZ", {
                hour12: false,
                timeZone: "UTC"
            });
        };
        return Time;
    }());
    Database.Time = Time;
    var Timetable = /** @class */ (function () {
        function Timetable(course) {
            this._level = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[1]);
            this._module = course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[2];
            this._group = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[3]);
            this.filePath = (0, path_1.join)("timetable", this._level + this._module, this._level + this._module + this._group + ".json");
            this.timetable = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
        }
        Object.defineProperty(Timetable.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (level) {
                this._level = level;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Timetable.prototype, "module", {
            get: function () {
                return this._module;
            },
            set: function (module) {
                this._module = module;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Timetable.prototype, "group", {
            get: function () {
                return this._group;
            },
            set: function (group) {
                this._group = group;
            },
            enumerable: false,
            configurable: true
        });
        Timetable.prototype.getAllLessons = function () {
            return this.timetable;
        };
        return Timetable;
    }());
    Database.Timetable = Timetable;
})(Database || (Database = {}));
exports["default"] = Database;
var timetable = new Database.Timetable("5BIS3");
console.log("today", timetable.getAllLessons());
