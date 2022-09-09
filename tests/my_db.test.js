import {dbReturn, dbInit, tryLogin, trySignUp, readTasks, updateTasks} from '../server/my_db'

describe("Database tests", () => {
    beforeAll(async () => {
        await dbInit();

        /*  For some reason, we have to sleep for 200ms until
            the database works if it was created via dbInit().
            I have no idea why.
        */
        await new Promise(r => setTimeout(r, 200));
    });

    test("Login: good credentials", async () => {
        const res = await tryLogin("TestUsr1", "TestPwd1"); 
        expect(res).toBe(dbReturn.OK);
    });

    test("Login: bad credentials", async () => {
        const res = await tryLogin("TestUsr1", "BadPassword");
        expect(res).toBe(dbReturn.loginError);
    });

    test("SignUp: new username", async () => {
        const res = await trySignUp(Math.random().toString(), "NewPassword");
        expect(res).toBe(dbReturn.OK);
    });

    test("SignUp: existing username", async () => {
        const res = await trySignUp("TestUsr1", "NewPassword");
        expect(res).toBe(dbReturn.userAlreadyExists);
    });

    test("readTasks: TestUsr1", async () => {
        const res = await readTasks("TestUsr1");
        expect(res[0]).toMatch("Pucio henzap");
    });

    test("updateTasks: TestUsr1", async () => {
        await updateTasks("TestUsr1", ["Pucio henzap", "New task"]);

        const res = await readTasks("TestUsr1");
        expect(res[0]).toMatch("Pucio henzap");
        expect(res[1]).toMatch("New task");
    });
})