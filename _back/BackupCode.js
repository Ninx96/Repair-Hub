const RenderComponent = ({ item }) => {
  const grpImages = _.chunk(
    item.site_images ? item.site_images.split(",") : [],
    3
  );
  const slides = grpImages.map((grp, idx) => (
    <View
      key={idx}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {grp.map((img, id) => (
        <ImageView
          key={id}
          source={{ uri: taskImages + img }}
          style={{
            height: 100,
            width: 90,
            marginHorizontal: 5,
            marginVertical: 10,
            borderRadius: 5,
          }}
        />
      ))}
    </View>
  ));

  if (userType == "client") {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
          Location : {item?.site_area_name}
        </Text>
        <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
          Size : {item.size_w} x {item.size_h}
        </Text>
        <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
          Media : {item?.medium?.name}
        </Text>
        <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
          Media Type : {item?.medium_type?.name}
        </Text>

        <View style={{ height: 120 }}>
          <Swiper
            style={{ flex: 1 }}
            loadMinimal={true}
            autoplay={false}
            showsPagination={false}
            showsButtons={true}
          >
            {slides}
          </Swiper>
        </View>

        {/* {item.site_images != "" && (
            <FlatList
              data={item.site_images.split(",")}
              renderItem={({ item }) => (
                <ImageView
                  source={{ uri: taskImages + item }}
                  style={{
                    height: 100,
                    width: 90,
                    marginHorizontal: 5,
                  }}
                />
              )}
              keyExtractor={(_, idx) => idx + "img"}
              horizontal
              style={{ height: 120 }}
            />
          )} */}
      </View>
    );
  }
};
