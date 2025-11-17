const checkSession = function()
{
    let userSession = JSON.parse(localStorage.getItem('user_session'));
    if (userSession)
    {
        if(now >userSession.expiry)
        {
            localStorage.removeItem('user_session');
            const now = new Date().getTime();
        }
        else
        {
            console.log("Phiên đăng nhập còn hợp lệ");
        }
    }
    else
    {
        window.location.href='./dangnhap.html'; 
    }
}
export {checkSession};