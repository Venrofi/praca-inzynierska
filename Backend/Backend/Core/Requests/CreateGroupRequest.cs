﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class CreateGroupRequest {
        /*userId: string;
          name: string;
          description: string;
          image: string;*/
        [Required(ErrorMessage = "null-userid")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "null-name")]
        [MaxLength(50, ErrorMessage = "long-name")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "null-description")]
        [MaxLength(2000, ErrorMessage = "long-description")]
        public string Description { get; set; } = string.Empty;

        //[Required(ErrorMessage = "null-image")]
        [MaxLength(200, ErrorMessage = "long-image")]
        public string Image { get; set; } = string.Empty;
    }
}
