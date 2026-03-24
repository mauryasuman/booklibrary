# Books Ko "Permanent" Rakhne Ka Guide 📚

Aapka system hardware/software dono tariko se data ko safe rakhta hai taaki aapki books kabhi delete na hon. Neeche diye gaye steps follow karein:

## 1. MongoDB Atlas (Cloud Database) ☁️
Aapka project **MongoDB Atlas** se connected hai. Iska fayda ye hai ki aapka data aapke computer par nahi, balki cloud par save hota hai.
- **Kya karein?**: `.env` file mein `MONGODB_URI` ko hamesha sahi rakhein. 
- **Persistency**: Jab tak aap Atlas account delete nahi karte, aapka data wahan hamesha safe rahega.

## 2. Local Backup (books.json) 📥
Aapka system automatic backup bhi banata hai. Har baar jab aap koi book **Add**, **Update**, ya **Delete** karte hain, wo is file mein sync ho jaati hai:
- **Location**: `backend/data/books.json`
- **Fayda**: Agar kisi wajah se aapka database empty ho jata hai, toh startup par server is file se saara data wapas database mein load kar dega.

## 3. Dummy Books Ko Permanent Banana 🛠️
Agar aap chahte hain ki kuch خاص (special) dummy books hamesha project ka hissa rahein:
1. `backend/data/books.json` file ko open karein.
2. Usme apni custom books ka JSON format mein data add kar dein.
3. Agli baar jab aapka database empty hoga, wahi books automatic load ho jayengi.

## 4. Seeding Control 🚦
Aapki `.env` file mein ek Option hai:
- `SEED_BOOKS=true`: Agar database khali hai toh 40 dummy books add hongi.
- `SEED_BOOKS=false`: Automatic dummy books add nahi hongi, sirf wahi load hongi jo `books.json` backup mein hain.

4. Data Sync (resync.js) ⚡
Agar aapko lagta hai ki Database aur `books.json` file mein data alag-alag hai, toh aap ye command run kar sakte hain:
- **Command**: `node backend/resync.js`
- **Kaam**: Ye script automatic dono ko sync kar degi. Agar DB khali hai toh JSON se load karegi, aur agar DB mein naya data hai toh JSON ko update kar degi.

5. Kuch Galt Hogya Toh? (Hard Reset) 🔄
Agar aapne kuch books delete kar di hain aur aap wapas wahi 40 dummy books chahte hain:
- **Command**: `node backend/seedBooks.js --force`
- **Warning**: Ye saara purana data delete karke fresh dummy books load karega.

---

### Step-by-Step Summary:
1. **Books Add Kaise Karein?**: Frontend UI se "Add Book" button use karein. Wo automatic Atlas aur `books.json` dono mein save ho jayega.
2. **Data Ud Gaya Toh?**: Fikar na karein! Bas server ko restart karein. Server `backend/data/books.json` ko check karega aur sab wapas le aayega. Ya fir `node backend/resync.js` run karein.
3. **Manual Entry**: Agar aap bulk mein books add karna chahte hain, toh direct `backend/data/books.json` mein array ke andar objects paste kar sakte hain.

**Hamesha Yaad Rakhein**: `backend/data/books.json` file aapke data ki asli "Chabi" (key) hai. Iska backup zaroor rakhein!
