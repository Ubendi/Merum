using Merum_BE.Data;

namespace Merum_BE.BL
{
    public class GenericService
    {

        public GenericService()
        {
        }

        public bool DeleteFile(string filePath, string fileName)
        {
            var fullPath = Path.Combine(filePath,fileName);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
                return true;
            }
            return false;
        }
    }
}
