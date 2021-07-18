package core.model.dto;


public class ImageDTO {

    private Long id;

    private String url;

    private Long id_elo;

    public ImageDTO() {
    }

    public ImageDTO(Long id, String url,Long id_elo) {
        this.id = id;
        this.url = url;
        this.id_elo = id_elo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getId_elo() {
        return id_elo;
    }

    public void setId_elo(Long id_elo) {
        this.id_elo = id_elo;
    }

    
}
