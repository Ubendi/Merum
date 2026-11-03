namespace Merum_BE.BL
{
    public class GuesthouseService
    {
        public List<string?> GetGuesthouseImagesService()
        {
            var baseDir = Directory.GetCurrentDirectory();
            var guesthouseImagesDir = Path.Combine(baseDir,"Pics","Guesthouse");
            
            if (!Directory.Exists(guesthouseImagesDir))
            {
                return new List<string?>();
            }

            return Directory.GetFiles(guesthouseImagesDir).Select(Path.GetFileName).ToList();
        }
    }
}
