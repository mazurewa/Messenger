using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Domain
{
    public class MessengerContext : DbContext
    {
        public DbSet<Message> Messages { get; set; }
        public DbSet<PrivateMessage> PrivateMessages { get; set; }

        public MessengerContext(DbContextOptions options) : base(options)
        {
        }

        public override int SaveChanges()
        {
            AddTimestamp();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            AddTimestamp();
            return base.SaveChangesAsync(cancellationToken);
        }

        public void AddTimestamp()
        {
            var entities = ChangeTracker.Entries().Where(x => x.State == EntityState.Added && x.Entity is BaseEntity)
                .Select(x => x.Entity as BaseEntity).ToList();

            entities.ForEach(x => x.DateCreated = DateTime.UtcNow);
        }
    }
}
