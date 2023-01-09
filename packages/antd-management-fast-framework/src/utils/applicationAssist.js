let currentLocation = {};

export function setCurrentLocation(location) {
  currentLocation = location;
}

export function getCurrentLocation() {
  return {
    ...{
      pathname: '',
    },
    ...currentLocation,
  };
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
