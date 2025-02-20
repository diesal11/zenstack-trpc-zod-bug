# Zenstack TRPC/Zod bug

to reproduce the bug, run the following commands:

```bash
./start-database.sh
```

then in another terminal:

```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

Then navigate to `http://localhost:3000/` and click the button.
You should see the error in the server console.

The file containing the TRPC calls is `src/app/page.tsx`
