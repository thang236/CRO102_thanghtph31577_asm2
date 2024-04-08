import { DarkTheme } from '@react-navigation/native';
import React, { createContext, useState, useContext } from 'react'
import { darkTheme, lightTheme } from './theme'


const ThemeContext = createContext(); // khởi tạo context cho theme
// khi sử dụng sẽ dùng thẻ <MyTheme >....</MyTheme> để bao gói giao diện ứng dụng
// phần .... ở cấu trúc trên là thuộc tính children
export const MyTheme = ({ children }) => {
    // tạo state để lưu trạng thái chọn theme
    const [isDarkMode, setIsDarkMode] = useState(false)

    // tạo hàm chuyển đổi giao diện
    const toggleTheme = () => {
        // tùy theo có nhiều mẫu giao diện thì dùng if else....
        setIsDarkMode(!isDarkMode);
    }
    const theme = isDarkMode ? darkTheme : lightTheme;


    // return về một theme contexxt
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = () => {
    return useContext(ThemeContext);
}
