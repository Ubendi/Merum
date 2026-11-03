using Azure.Core;
using System.Globalization;
using System.Text;
using System.Linq;

namespace Merum_BE.BL
{
    public class FileService
    {
        public FileService()
        {
        }
        public async Task<string> UploadFileAsync(IFormFile file, string folder, string subFolder, string? desiredName = null)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("File is null or empty", nameof(file));
            }

            string safeName = String.IsNullOrWhiteSpace(desiredName) ? 
                Path.GetFileNameWithoutExtension(file.FileName) : desiredName.Trim().ToLower().Replace(" ","-");

            safeName = RemoveAccents(safeName);

            string timestamp = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss");
            string extension = Path.GetExtension(file.FileName);
            string finalFileName = $"{timestamp}-{safeName}{extension}";
            var rootDir = Directory.GetCurrentDirectory();
            var targetDirectory = Path.Combine(rootDir, folder, subFolder);

            if (!Directory.Exists(targetDirectory))
            {
                Directory.CreateDirectory(targetDirectory);
            }

            var uploadPath = Path.Combine(targetDirectory, finalFileName);
            using (FileStream stream = new FileStream(uploadPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var relativePath = Path.Combine(folder, subFolder, finalFileName).Replace("\\", "/");
            return relativePath;
        }

        public async Task DeleteFileAsync(string relativePath)
        {
            var rootDir = Directory.GetCurrentDirectory();
            var fullPath = Path.Combine(rootDir, relativePath);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
            await Task.CompletedTask;
        }

        private static string RemoveAccents(string input) =>
        new string(
            input.Normalize(NormalizationForm.FormD)
                 .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                 .ToArray()
        )
        .Normalize(NormalizationForm.FormC);

    }
}
