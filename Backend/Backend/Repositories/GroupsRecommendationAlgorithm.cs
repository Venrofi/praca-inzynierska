using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Repositories {

    public class GroupsRecommendationAlgorithm {

        private readonly ApplicationDbContext _context;

        public GroupsRecommendationAlgorithm(ApplicationDbContext context)
        {
            _context = context;
        }

        //Maybe with tags, something... xd
        public List<Group> GetRecommendedGroups(User user) {
            if(user == null || user.Groups == null || !user.Groups.Any())
                return  _context.Groups.OrderBy(g => g.Users.Count).ToList();

            List<Group> targetGroups = _context.Users.First(u => u == user).Groups;
                
            List<User> similarUsers =  _context.Users
                .Where(u => u != user && u.Groups.Any(g => targetGroups.Contains(g)))
                .ToList();

            List<Group> recommendedGroups = similarUsers
                .SelectMany(u => u.Groups.Select(g => g))
                .Where(group => !targetGroups.Contains(group))
                .Distinct().OrderBy(g=>g.Users.Count)
                .ToList();

            if(recommendedGroups.Count <= 0)
                return _context.Groups.OrderBy(g => g.Users.Count).ToList();

            if (recommendedGroups.Count <= 5)
                return recommendedGroups.ToList();

            return recommendedGroups.Take(5).ToList();
        }
    }
}
