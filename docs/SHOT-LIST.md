# Shot list

Drop originals (JPEG or HEIC converted to JPEG, the largest size the camera gives) into `public/photos-incoming/` using the file names below, then add alt text in `src/config/photos.ts` and run `npm run photos`. A photo with no alt text is not used.

Shoot in daylight or with the hall lights on, phone held level, no filters, no people's faces without their permission.

| #   | File name            | Shot                                                                                                 | Orientation   | Minimum size | Used on                     |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------- | ------------- | ------------ | --------------------------- |
| 1   | `exterior.jpg`       | Front of the building with the signboard readable, daylight, from across Field Marshal Cariappa Road | Landscape 3:2 | 2400 x 1600  | Home hero, Visit            |
| 2   | `entrance.jpg`       | Entrance door and steps or ramp, straight on                                                         | Portrait 4:5  | 1600 x 2000  | Visit (shows access)        |
| 3   | `dosa-plate.jpg`     | Masala dosa on its plate with chutneys and sambar, from 45 degrees                                   | Landscape 3:2 | 2400 x 1600  | Home hero alternative, Menu |
| 4   | `idli-vada.jpg`      | Idli and vada with chutney, top down                                                                 | Square        | 2000 x 2000  | Menu                        |
| 5   | `tiffin-counter.jpg` | The dosa or tiffin counter in action, cook's hands only                                              | Landscape 3:2 | 2400 x 1600  | Menu                        |
| 6   | `chaat-counter.jpg`  | Evening chaat counter with masala puri being served                                                  | Landscape 3:2 | 2400 x 1600  | Menu                        |
| 7   | `north-indian.jpg`   | Paneer butter masala with butter kulcha                                                              | Landscape 3:2 | 2400 x 1600  | Menu                        |
| 8   | `coffee.jpg`         | Filter coffee in tumbler and dabara                                                                  | Portrait 4:5  | 1600 x 2000  | Home                        |
| 9   | `dining-hall.jpg`    | Dining hall, wide, from a corner, tables set                                                         | Landscape 3:2 | 2400 x 1600  | Home, Visit                 |
| 10  | `banquet-wide.jpg`   | Banquet hall empty, wide, lights on                                                                  | Landscape 3:2 | 2400 x 1600  | Banquet                     |
| 11  | `banquet-stage.jpg`  | Stage with decor, empty                                                                              | Landscape 3:2 | 2400 x 1600  | Banquet                     |
| 12  | `parking.jpg`        | Parking area, showing how many vehicles fit                                                          | Landscape 3:2 | 2400 x 1600  | Visit                       |

The pipeline makes AVIF and WebP at 480, 800, 1200 and 1600 px wide, keeps the aspect ratio, strips location data from the files and records width and height.
