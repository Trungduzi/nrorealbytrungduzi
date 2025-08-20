import db from "../models/index.js"
import bcrypt, { hash } from "bcrypt"


const hashUserPassword = async (password) => {
    try {
        let saltRound = bcrypt.genSaltSync(10);
        let hashPassword = await bcrypt.hash(password, saltRound);
        return hashPassword;
    } catch (e) {
        throw (e);
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await db.creatUser.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Lỗi getAllUser:", error);
        return res.status(500).json({ error: "Lỗi server khi lấy user" });
    }
};

export const getHistory = async (req, res) => {
    const { id } = req.body;
    try {
        const historyCard = await db.history.findAll({
            where: { userId: id }, // 🔥 ĐẢM BẢO ĐÚNG FIELD
            order: [['createdAt', 'DESC']],
            // limit: 1 //  KHÔNG CÓ LIMIT nếu muốn lấy tất cả
        });
        return res.status(200).json(historyCard);
    } catch (error) {
        console.error("Lỗi getAllUser:", error);
        return res.status(500).json({ error: "Lỗi server khi lấy user" });
    }
};

export const createUser = async (req, res) => {
    const { email, firstName, user, phoneNumber, password } = req.body;

    if (!email || !user || !phoneNumber || !password) {
        console.log("Không được để trống!");
        return res.status(400).json({ error: 'Không được để trống các trường bắt buộc!' });
    }

    try {
        const existingEmail = await db.creatUser.findOne({ where: { email } });
        console.log("Lỗi ở đây này");
        if (existingEmail) {
            return res.status(400).json({ error: 'Email đã tồn tại!' });
        }

        const existingPhone = await db.creatUser.findOne({ where: { phoneNumber } });
        if (existingPhone) {
            return res.status(400).json({ error: 'Số điện thoại đã tồn tại!' });
        }

        const existingUser = await db.creatUser.findOne({ where: { user } });
        if (existingUser) {
            return res.status(400).json({ error: 'User đã tồn tại!' });
        }

        const hashPass = await hashUserPassword(password);

        const newUser = await db.creatUser.create({
            email,
            password: hashPass,
            firstName,
            user,
            phoneNumber,
        });

        return res.status(201).json({
            status: true,
            message: 'Tạo user thành công',
            user: newUser
        });
    } catch (error) {
        console.error("Lỗi tạo user:", error);
        return res.status(500).json({ error: 'Lỗi hệ thống khi tạo người dùng!' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    if (!email || !password) {
        return res.status(400).json({ message: "Không được để trống!" });
    }

    const user = await db.creatUser.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "Email không tồn tại!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Sai mật khẩu!" });
    }

    return res.status(200).json({
        status: "success",
        message: "Đăng nhập thành công",
        user: { id: user.id, email: user.email, firstName: user.firstName, user: user.user, phoneNumber: user.phoneNumber, dollar: user.dollar }
    });
}

const createCard = async (req, res) => {
    const { name, price, code, serial } = req.body;
    if (!code || !serial) {
        return res.status(404).json(
            {
                status: false,
                message: "Điền đầy đủ thông tin",
            }
        )
    }
    const existCode = await db.createCard.findOne({ where: { code } });
    const existSerial = await db.createCard.findOne({ where: { serial } });
    if (existCode || existSerial) {
        return res.status(409).json({
            status: false,
            message: "Trùng thẻ",
        });
    }
    const newCard = await db.createCard.create({
        name,
        price,
        code,
        serial,
    })
    return res.status(201).json({
        status: true,
        message: 'Tạo thẻ thành công',
        user: newCard,
    });
}

const napCard = async (req, res) => {
    const { type, price, code, serial, username, dollar, id } = req.body;
    const name = type;
    const cardNo = { name, price, code, serial };
    console.log(cardNo);
    try {
        if (!type || !price || !code || !serial) {
            return res.status(403).json({
                status: false,
                message: "Không được để trống",
            })
        }
        const findCard = await db.createCard.findOne({ where: { code } });
        if (!findCard) {
            await historyCard(cardNo, id, 0, "Không thành công");
            return res.status(403).json({
                status: false,
                message: "Không có thẻ",
            });
        } else {
            if (type !== findCard.name || price !== findCard.price || serial !== findCard.serial) {
                await historyCard(findCard, findCard.id, 0, "Không thành công");
                return res.status(403).json({
                    status: false,
                    message: "Nạp thẻ thành công(Không lừa ai ngoài vợ admin ^_^)",
                });
            }
            else {
                const findUser = await db.creatUser.findOne({ where: { user: username } });
                if (!findUser) {
                    return res.status(404).json({ status: false, message: "Không tìm thấy user" });
                }
                const updatedDollar = Number(findUser.dollar) + Number(price * 1);
                await db.creatUser.update(
                    { dollar: updatedDollar },
                    { where: { id: findUser.id } },
                )
                const updatedUser = await db.creatUser.findOne({ where: { id: findUser.id } });
                await historyCard(findCard, findUser.id, price, "Thành công");
                await deleteCard(findCard);
                return res.status(201).json({
                    status: true,
                    message: "Nạp thẻ thành công!",
                    user: updatedUser,
                });
            }
        }

    } catch (e) {
        console.error("❌ Lỗi khi nạp thẻ:", e);
        return res.status(404).json({
            status: false,
            message: "Lỗi ngay từ bước này rồi",
        })
    }
}

const deleteCard = async (codeCard) => {
    await db.createCard.destroy(
        { where: { id: codeCard.id } },
    )
}

const historyCard = async (addCard, userId, receive, statusSv) => {
    try {
        const { name, price, serial, code } = addCard;
        const status = statusSv;
        return await db.history.create({
            name,
            price,
            serial,
            code,
            userId,
            receive,
            status,
        })
    } catch (e) {
        console.error("Lỗi khi lưu lịch sử thẻ:", error);
    }
}

const getHistoryCard = async (req, res, userId) => {
    try {
        const userId = req.query.id;
        console.log(userId);
        const cardExpress = await db.history.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']] // mới nhất trước
        });
        return res.status(200).json(cardExpress);
    } catch (error) {
        console.error("Lỗi getCardbe:", error);
        return res.status(500).json({ error: "Lỗi server khi lấy Card" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { id, password, newPassword, confirmPassword } = req.body;
        console.log(id, password, newPassword, confirmPassword);
        const user = await db.creatUser.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại",
                status: false,
            });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                meassage: "Mật khẩu sai",
            });
        }
        const hashPW = await hashUserPassword(newPassword);
        const userReset = await db.creatUser.update(
            { password: hashPW },
            { where: { id } }
        );
        return res.status(201).json({
            status: true,
            message: "Đổi mật khẩu thành công!",
            user: userReset,
        });
    }
    catch (e) {
        console.error("Lỗi ở homeController", e);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const getInformation = async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Gọi API tra cứu vị trí theo IP
    const apiRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await apiRes.json();

    // Không in ra, chỉ dùng nội bộ
    // await saveToDatabase({ ip, location: data });
    console.log(data)

    // Trả về cho front-end dữ liệu khác, không chứa IP
    res.json({ message: "OK" });
}

const byCard = async (req, res, userId) => {
    try {
        const { type, price } = req.body;
        const id = userId;
        const findCard = await db.createCard.findAll({ where: { type, price } });
        console.log(findCard);
        Math.floor(Math.random() * 10000);
    }
    catch (e) {
        console.log("Lỗi bên homeController", e);
        return;
    }
}

export default {
    createUser,
    getAllUser,
    login,
    createCard,
    napCard,
    getHistory,
    getHistoryCard,
    resetPassword,
    getInformation,
    byCard,
};
