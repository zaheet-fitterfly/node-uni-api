// const lib = require('../lib');


// describe('absolute', () => {
//     it('should return +ve number', () => {
//         // throw new Error("something failed");
//         const result = lib.absolute(1);
//         expect(result).toBe(1);
//     });

//     it('should return -ve number', () => {
//         // throw new Error("something failed");
//         const result = lib.absolute(-1);
//         expect(result).toBe(1);
//     });

//     it('should return zero number', () => {
//         // throw new Error("something failed");
//         const result = lib.absolute(0);
//         expect(result).toBe(0);
//     });
// });



// describe('greet', () => {
//     it('should return the greeting meesage', () => {
//         const result = lib.greet('zaheet');
//         expect(result).toMatch(/zaheet/);
//     });
// });

// describe('getCurrencies', () => {
//     it('should return supported currencies', () => {
//         const result = lib.getCurrencies();

//         expect(result).toEqual(expect.arrayContaining(['USD', 'INR', 'CAD']));
//     })
// });

// describe('getProduct', () => {
//     it('should return product with given ID', () => {
//         const result = lib.getProduct(1);

//         expect(result).toMatchObject({ id: 1, price: 10 });
//         expect(result).toHaveProperty('id', 1);
//     })
// });

// describe('registerUser', () => {
//     it('should throw if username is falsy', () => {

//         const args = [null, undefined, NaN, '', 0, false];
//         args.forEach(a => {
//             expect(() => {
//                 lib.registerUser(a)
//             }).toThrow();
//         })

//     });

//     it('should throw signed in', () => {
//         console.log("in zaheet");
//         const result = lib.registerUser("zaheet");
//         expect(result).toMatchObject({ username: "zaheet" });
//         expect(result.id).toBeGreaterThan(0);
//     })
// });