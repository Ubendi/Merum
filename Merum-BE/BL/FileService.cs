using Azure.Core;

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

            string timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
            string extension = Path.GetExtension(file.FileName);
            string finalFileName = $"{safeName}-{timestamp}{extension}";
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
    }
}
