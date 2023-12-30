using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace Backend.Repositories {
    public class ProfanitySearchAlgorithm {

        private readonly ApplicationDbContext _context;

        public ProfanitySearchAlgorithm(ApplicationDbContext context) {
            _context = context;
        }

        public string ChangeCharacters(string word) {
            return word.ToLower()
                .Replace('!', 'i').Replace('@', 'a').Replace('$', 's').Replace('€', 'e')
                .Replace('0', 'o').Replace('1', 'i').Replace('3', 'e').Replace('4', 'a').Replace('5', 's').Replace('7', 'l').Replace('8', 'b')
                .Replace('ó', 'o').Replace('ę', 'e').Replace('ą', 'a').Replace('ł', 'l').Replace('ś', 's')
                .Replace('ż', 'z').Replace('ź', 'z').Replace('ć', 'c').Replace('ń', 'n');
        }

        public async Task<bool> HasBadWords(string inputWords) {
            var profanities = await _context.Profanities.Select(p => p.ProfanitiesName).ToListAsync();
            if(!profanities.Any()) {
                return false;
            }
            string words = string.Join("|", profanities);
            words = words.Remove(words.Length - 1);
            Regex wordFilter = new Regex(words);
            return wordFilter.IsMatch(inputWords);
        }

    }
}
