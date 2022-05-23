import PathRoute from "./PathRoute";

interface BreadI {
    title: string;
    path: string;
}
const Breadscrumb: BreadI[] = [
    {
        title: 'Đăng nhập',
        path: PathRoute.Login
    },
    {
        title: "Trang chủ",
        path: PathRoute.Home
    },
    {
        title: "Thông tin cá nhân",
        path: PathRoute.Profile
    },
    {
        title: "Danh sách dự án",
        path: PathRoute.ProjectTNR
    }
]

export default Breadscrumb