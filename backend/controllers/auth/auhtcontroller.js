import User from "../../models/user_model.js";
import jwt from "jsonwebtoken"


const genarateToken = (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "24h" })
    res.cookie('jwt', token)
}


const signnin = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        console.log(req.body)

        if (password < 4) res.status(404).json({ message: 'Password must be greater then 6' })
        const newUser = new User({ ...req.body });
        const user = await User.findOne({ username })
        if (user) res.status(404).json({ error: 'username aleardy taken' })

        if (newUser) {
            await newUser.save()
            res.status(201).json({ newUser })
        }
        else {
            res.status(404).json({ message: 'user signup failed' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    console.log(user);
     
        const token = genarateToken(user._id,res);
        console.log('Generated token:', token);

        res.status(200).json({
            id: user._id,
             token : token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    } finally {
        console.log('Login attempt finished');
    }
};


const logout = async (req, res) => {
    try {
        res.ccokie('jwt', '')
        res.status(200).json({ message: 'User Logout Succesfully' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error.message });
    }
};



const get_AuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findOne(req.user._id);


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err.message });
    }
};
export { login, signnin, logout, get_AuthenticatedUser };