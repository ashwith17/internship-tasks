using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<List<T>> GetAll();

        public Task<T?> GetById(object? id);

        public Task Add(T entity);

        public Task Update(T entity);

        public Task Delete(T entity);
    }
}
