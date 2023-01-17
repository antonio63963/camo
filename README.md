#Camo
A social app that allows you to share photos by categories and take commits.
This is a full stack app with Type Script.

##Features:

- Google Auth (new API)
- Login by Email (Account with photo)
- Custom validation fields something like Zod library using chaining pattern.
- Uploading photo or source link photo.
- JWT tokens in headers. (accsess, refresh).
- CRUD.

---

##Client:

- **React.js**.
- **Type Script.**
- **Tailwind.**

---

##Server:

- **Node.js/Express.js.**
- **MongoDB.**
- **Mongoose.**

---

###Custom validation:

```
const nameInput = validation
      .string(name)
      .isEmpty()
      ?.minLength(2)
      ?.maxLength(30)
      ?.result();
```
![](camo.png)

##Thank you for watching!