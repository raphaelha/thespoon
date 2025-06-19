"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, allCommunities, _i, allUsers_1, user, _a, allCommunities_1, community, restosData, restos, _b, allCommunities_2, community, members, _c, members_1, member, votedRestoIds, i, resto;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('🔄 Début du seed...');
                    // --- Communautés ---
                    return [4 /*yield*/, prisma.community.createMany({
                            data: [
                                { name: 'La team produit', code: 'produit' },
                                { name: 'La bande du jeudi soir', code: 'jeudi' },
                                { name: 'Les runners de Rennes', code: 'runrennes' },
                            ],
                        })];
                case 1:
                    // --- Communautés ---
                    _d.sent();
                    console.log('✅ Communautés créées');
                    // --- Utilisateurs ---
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                { name: 'Alice', pseudo: 'alice' },
                                { name: 'Bob', pseudo: 'bob' },
                                { name: 'Chloé', pseudo: 'chloe' },
                                { name: 'David', pseudo: 'david' },
                                { name: 'Emma', pseudo: 'emma' },
                            ],
                        })];
                case 2:
                    // --- Utilisateurs ---
                    _d.sent();
                    console.log('✅ Utilisateurs créés');
                    return [4 /*yield*/, prisma.user.findMany()];
                case 3:
                    allUsers = _d.sent();
                    return [4 /*yield*/, prisma.community.findMany()];
                case 4:
                    allCommunities = _d.sent();
                    _i = 0, allUsers_1 = allUsers;
                    _d.label = 5;
                case 5:
                    if (!(_i < allUsers_1.length)) return [3 /*break*/, 10];
                    user = allUsers_1[_i];
                    _a = 0, allCommunities_1 = allCommunities;
                    _d.label = 6;
                case 6:
                    if (!(_a < allCommunities_1.length)) return [3 /*break*/, 9];
                    community = allCommunities_1[_a];
                    if (!(Math.random() > 0.4)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.userCommunity.create({
                            data: {
                                userId: user.id,
                                communityId: community.id,
                            },
                        })];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    _i++;
                    return [3 /*break*/, 5];
                case 10:
                    console.log('✅ Liens utilisateurs ↔ communautés créés');
                    restosData = [
                        { name: 'Chez Yvonne', city: 'Rennes' },
                        { name: 'Le Bistrot Local', city: 'Rennes' },
                        { name: 'Côté Sushi', city: 'Rennes' },
                        { name: 'La Trattoria', city: 'Rennes' },
                        { name: 'Burger Square', city: 'Rennes' },
                        { name: 'La Cantine Digitale', city: 'Rennes' },
                        { name: 'Bento Lab', city: 'Rennes' },
                        { name: 'Casa Mia', city: 'Rennes' },
                        { name: 'Tandoori Express', city: 'Rennes' },
                        { name: 'Les Saveurs Bretonnes', city: 'Rennes' },
                    ];
                    return [4 /*yield*/, Promise.all(restosData.map(function (resto, i) {
                            return prisma.restaurant.create({
                                data: __assign(__assign({}, resto), { addedById: allUsers[i % allUsers.length].id }),
                            });
                        }))];
                case 11:
                    restos = _d.sent();
                    console.log('✅ Restaurants créés');
                    _b = 0, allCommunities_2 = allCommunities;
                    _d.label = 12;
                case 12:
                    if (!(_b < allCommunities_2.length)) return [3 /*break*/, 20];
                    community = allCommunities_2[_b];
                    return [4 /*yield*/, prisma.userCommunity.findMany({
                            where: { communityId: community.id },
                        })];
                case 13:
                    members = _d.sent();
                    _c = 0, members_1 = members;
                    _d.label = 14;
                case 14:
                    if (!(_c < members_1.length)) return [3 /*break*/, 19];
                    member = members_1[_c];
                    votedRestoIds = new Set();
                    i = 0;
                    _d.label = 15;
                case 15:
                    if (!(i < Math.floor(Math.random() * 5) + 1)) return [3 /*break*/, 18];
                    resto = restos[Math.floor(Math.random() * restos.length)];
                    if (votedRestoIds.has(resto.id))
                        return [3 /*break*/, 17];
                    return [4 /*yield*/, prisma.vote.create({
                            data: {
                                userId: member.userId,
                                restaurantId: resto.id,
                                communityId: community.id,
                                // Note aléatoire entre 1 et 5, avec décimales pour plus de réalisme
                                note: Math.round((Math.random() * 4 + 1) * 10) / 10,
                            },
                        })];
                case 16:
                    _d.sent();
                    votedRestoIds.add(resto.id);
                    _d.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 15];
                case 18:
                    _c++;
                    return [3 /*break*/, 14];
                case 19:
                    _b++;
                    return [3 /*break*/, 12];
                case 20:
                    console.log('✅ Votes générés');
                    console.log('🌱 Seed terminé avec succès.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
})
    .finally(function () { return prisma.$disconnect(); });
