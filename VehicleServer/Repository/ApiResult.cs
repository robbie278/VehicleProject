using LinqKit;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using VehicleServer.Entities;
using VehicleServer.Enums;

namespace VehicleServer.Repository
{
    public class ApiResult<T>
    {

        private ApiResult(
            List<T> data,
            int count,
            int pageIndex,
            int pageSize,
            string? sortColumn,
            string? sortOrder,
            string? filterColumn = null,
            string? filterQuery = null,
            string? transactionType = null,
            int? itemId = null,
            int? storeId = null)
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
            TransactionType = transactionType;
            ItemId = itemId;
            StoreId = storeId;

        }


        public static async Task<ApiResult<T>> CreateAsync(
    IQueryable<T> source,
    int pageIndex,
    int pageSize,
    string? sortColumn = null,
    string? sortOrder = null,
    string? filterColumn = null,
    string? filterQuery = null,
    string? transactionType = null,
    int? itemId = null,
    int? storeId = null)
        {
            if (!string.IsNullOrEmpty(filterQuery))
            {
                // Normalize the filter query to ensure consistent Unicode representation
                filterQuery = filterQuery.Normalize(NormalizationForm.FormC);

                var properties = typeof(T).GetProperties()
                    .Where(p => p.PropertyType == typeof(string)); // Filter to string properties only

                Expression<Func<T, bool>> predicate = PredicateBuilder.False<T>();

                foreach (var property in properties)
                {
                    var parameter = Expression.Parameter(typeof(T), "x");
                    var propertyAccess = Expression.Property(parameter, property.Name);
                    var startsWithMethod = typeof(string).GetMethod("StartsWith", new[] { typeof(string) });
                    var someValue = Expression.Constant(filterQuery, typeof(string));
                    var startsWithExpression = Expression.Call(propertyAccess, startsWithMethod, someValue);

                    var lambda = Expression.Lambda<Func<T, bool>>(startsWithExpression, parameter);

                    predicate = PredicateBuilder.Or(predicate, lambda);
                }

                source = source.Where(predicate);
            }

            if (!string.IsNullOrEmpty(transactionType))
            {
                source = source.Where(t => EF.Property<string>(t, "TransactionType") == transactionType);
            }

            if (itemId.HasValue)
            {
                source = source.Where(t => EF.Property<int>(t, "ItemId") == itemId);
            }

            if (storeId.HasValue)
            {
                source = source.Where(t => EF.Property<int>(t, "StoreId") == storeId);
            }

            var count = await source.CountAsync();

            if (!string.IsNullOrEmpty(sortColumn) && IsValidProperty(sortColumn))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(string.Format("{0} {1}", sortColumn, sortOrder));
            }

            source = source.Skip(pageIndex * pageSize).Take(pageSize);

            var data = await source.ToListAsync();

            return new ApiResult<T>(
                data,
                count,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery,
                transactionType,
                itemId,
                storeId);
        }




        public static bool IsValidProperty(
            string propertyName,
            bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    string.Format(
                        $"ERROR: Property '{propertyName}' does not exist.")
                    );
            return prop != null;
        }

        public List<T> Data { get; private set; }


        public int PageIndex { get; private set; }


        public int PageSize { get; private set; }


        public int TotalCount { get; private set; }


        public int TotalPages { get; private set; }


        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return ((PageIndex + 1) < TotalPages);
            }
        }


        public string? SortColumn { get; set; }


        public string? SortOrder { get; set; }


        public string? FilterColumn { get; set; }


        public string? FilterQuery { get; set; }
        public string? TransactionType { get; set; }

        public int? ItemId { get; set; }
        public int? StoreId { get; set; }


    }
}
