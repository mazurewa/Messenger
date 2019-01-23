using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Messenger.Domain.Services
{
    public class UserManager : IUserManager
    {
        private List<LoggedUser> _users;

        public UserManager(List<LoggedUser> users)
        {
            _users = users;
        }

        public List<LoggedUser> GetAllUsers()
        {
            var users = _users;
            return users;
        }

        public LoggedUser GetUserById(string connectionId)
        {
            var user = _users.Single(u => u.ConnectionId == connectionId);
            return user;
        }

        public LoggedUser GetUserByLogin(string login)
        {
            var user = _users.SingleOrDefault(u => u.Login == login);
            return user;
        }

        public void AddUser(string login, string connectionId)
        {
            var user = new LoggedUser(login, connectionId);
            _users.Add(user);
        }

        public void RemoveUser(string connectionId)
        {
            var userToRemove = _users.Single(u => u.ConnectionId == connectionId);
            _users.Remove(userToRemove);
        }
    }
}
