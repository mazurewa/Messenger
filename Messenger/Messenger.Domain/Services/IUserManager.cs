using System.Collections.Generic;

namespace Messenger.Domain.Services
{
    public interface IUserManager
    {
        void AddUser(string login, string connectionId);
        List<LoggedUser> GetAllUsers();
        LoggedUser GetUserById(string connectionId);
        LoggedUser GetUserByLogin(string login);
        void RemoveUser(string connectionId);
    }
}