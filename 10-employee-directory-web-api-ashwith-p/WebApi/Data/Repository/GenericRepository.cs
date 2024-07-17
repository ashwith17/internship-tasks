using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class GenericRepository<T>(AshwithEmployeeDirectoryContext context) : IGenericRepository<T> where T : class
    {
        private readonly AshwithEmployeeDirectoryContext _dbContext = context;

        public async Task<List<T>> GetAll()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async virtual Task<T?>  GetById(object? id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
           await _dbContext.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
